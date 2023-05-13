import { Row } from "antd";
import DashboardCard from "../../components/Cards/DashboardCard";
import { getCurrencyFormat } from "../../utils/common.util";
import "./Dashboard.styles.css";

const Dashboard = () => {
  return (
    <div>
      <h1>Orders</h1>
      <Row className="dashboard-row">
        <DashboardCard period="TODAY" totalSales={2} />
        <DashboardCard period="THIS WEEK" totalSales={25} />
        <DashboardCard period="THIS MONTH" totalSales={259} />
      </Row>

      <h1 className="dashboard-h1">Revenue</h1>

      <Row className="dashboard-row">
        <DashboardCard period="TODAY" totalSales={getCurrencyFormat(234)} />
        <DashboardCard
          period="THIS WEEK"
          totalSales={getCurrencyFormat(2374)}
        />
        <DashboardCard
          period="THIS MONTH"
          totalSales={getCurrencyFormat(233324)}
        />
      </Row>
    </div>
  );
};

export default Dashboard;
