'use client';

import React, { useRef, useEffect, useState } from 'react';

/**
 * AccordionSection
 * props:
 *  - id: string
 *  - title: node/string
 *  - children: ReactNode
 *  - onExpand?: (id) => void   // 当展开时回调（用于父组件只展开一个）
 *  - expandedByParent?: boolean // 父组件强制展开
 */
export default function AccordionSection({
  id,
  title,
  children,
  onExpand,
  expandedByParent = false,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // IntersectionObserver：当元素进入视口时展开
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 0.25 表示至少 25% 可见就触发
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setInView(true);
            setExpanded(true);
            if (onExpand) onExpand(id);
          } else {
            setInView(false);
            // 默认如果父没有强制控制，则离开视口可以收起：
            if (!expandedByParent) setExpanded(false);
          }
        });
      },
      {
        root: null,
        threshold: [0.15, 0.5],
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [id, onExpand, expandedByParent]);

  // 父组件强制展开/收起时同步状态
  useEffect(() => {
    if (expandedByParent) setExpanded(true);
    else setExpanded(false);
  }, [expandedByParent]);

  // 点击标题也可以手动切换（同时通知父）
  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && onExpand) onExpand(id);
  };

  return (
    <section ref={ref} id={id} className="w-full max-w-3xl my-6">
      <button
        onClick={handleToggle}
        aria-expanded={expanded}
        className="w-full text-left px-6 py-4 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="text-sm text-gray-500">
            {expanded ? '收起 ▲' : '展开 ▼'}
          </span>
        </div>
      </button>

      {/* 内容区：用 max-height 做动画（高度自适应） */}
      <div
        className={
          'overflow-hidden transition-[max-height,opacity,transform] duration-700 ease-in-out ' +
          (expanded ? 'max-h-[1200px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2')
        }
        aria-hidden={!expanded}
      >
        <div className="px-6 py-4 bg-white/60 rounded-b-xl shadow-inner">
          {children}
        </div>
      </div>
    </section>
  );
}
