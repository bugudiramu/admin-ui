import { Card } from "antd";
import "./DashboardCard.styles.css";

interface IProps {
  period: string;
  totalSales: number | string;
}

const DashboardCard = ({ period, totalSales }: IProps) => {
  return (
    <Card className="card">
      <h5>{period}</h5>
      <p className="total-sales">{totalSales}</p>
      <p>
        {totalSales} orders {period.toLocaleLowerCase()}
      </p>
    </Card>
  );
};

export default DashboardCard;
