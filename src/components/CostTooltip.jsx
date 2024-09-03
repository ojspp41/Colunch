import React from "react";
import "../css/components/CostTooltip.css"; // 이 컴포넌트에 대한 CSS를 추가해주세요

function CostTooltip({ cost }) {
    return (
        <div className="cost-tooltip">
        <span>+{cost}포인트</span>
        </div>
    );
}

export default CostTooltip;
