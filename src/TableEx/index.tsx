import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Table, TableProps } from 'antd';
import './index.css';

export interface TableExProps<RecordType> extends TableProps<RecordType> {
  /** 是否自动计算滚动高度 */
  autoScroll?: boolean;
  /** 表格容器的类名 */
  containerClassName?: string;
  /** 表格容器样式 */
  containerStyle?: React.CSSProperties;
}

function TableEx<RecordType extends object = any>(
  props: TableExProps<RecordType>
) {
  const {
    autoScroll = true,
    containerClassName,
    containerStyle,
    scroll,
    pagination,
    ...tableProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number | undefined>();

  // 计算表格滚动高度
  const calculateScrollHeight = useMemo(() => {
    if (!autoScroll || !containerRef.current) {
      return scroll?.y;
    }

    const container = containerRef.current;
    const header = container.querySelector('.ant-table-thead');
    const paginationEl = container.querySelector('.ant-pagination');
    
    let height = container.clientHeight;
    
    // 减去表头高度
    if (header) {
      height -= header.clientHeight;
    }
    
    // 减去分页器高度
    if (pagination && paginationEl) {
      height -= paginationEl.clientHeight;
    }
    
    // 减去表格的 padding 和 border
    const tableStyle = window.getComputedStyle(container.querySelector('.ant-table')!);
    height -= parseInt(tableStyle.paddingTop) + parseInt(tableStyle.paddingBottom);
    height -= parseInt(tableStyle.borderTopWidth) + parseInt(tableStyle.borderBottomWidth);

    // 减去分页器的 margin
    const paginationStyle = window.getComputedStyle(container.querySelector('.ant-pagination')!);
    height -= parseInt(paginationStyle.marginTop) + parseInt(paginationStyle.marginBottom);
    
    // 确保最小高度
    return Math.max(height, 100);
  }, [autoScroll, pagination, scroll?.y]);

  useEffect(() => {
    if (autoScroll) {
      setScrollY(Number(calculateScrollHeight));
    }
  }, [autoScroll, calculateScrollHeight]);

  // 合并滚动配置
  const mergedScroll = useMemo(() => {
    if (!autoScroll) {
      return scroll;
    }
    
    return {
      ...scroll,
      y: scrollY,
    };
  }, [autoScroll, scroll, scrollY]);

  return (
    <div
      ref={containerRef}
      className={`table-ex-container ${containerClassName || ''}`}
      style={containerStyle}
    >
      <Table
        {...tableProps}
        scroll={mergedScroll}
        pagination={pagination}
      />
    </div>
  );
}

export default TableEx;