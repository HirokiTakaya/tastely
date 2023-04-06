import { useState, useEffect } from 'react';
import KitchenHeader from '../homepage/kitchenheader';
import './ownerpage.css';
import Footer from '../files/footer/Footer';

import UserBar from '../homepage/userheader';
import axios from 'axios';
import { BACKEND_API } from '../../config';

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SUBSCRIPTION_API_URL = `${BACKEND_API}/showcustomersubscribeplan`;

const Ownerpage = (props) => {
  // const navigate = useNavigate();
  // const loginUser = JSON.parse(localStorage.getItem('user'))._id;
  const [orderData, setOrderData] = useState();
  const [orderChartData, setChartOrderData] = useState();
  const { isActive, setIsActive } = props;

  useEffect(() => {
    axios(SUBSCRIPTION_API_URL).then((res) => {
      setOrderData(res.data);
      console.log(res.data);
      makeOrderChartData(res.data);
    });
  }, []);

  const makeOrderChartData = (orderData) => {
    let chartData = [];
    let revenue = 0;

    orderData.forEach((order) => {
      revenue += parseFloat(order.plan.price);
      chartData.push({
        date: order.date,
        orderPrice: parseFloat(order.plan.price),
        totalRevenue: revenue,
      });

      setChartOrderData(chartData);
    });
  };

  return (
    <div className="ownerpage">
      <div className={`${isActive ? 'show-side-bar' : ''} side-menu-bar`}>
        <KitchenHeader isActive={isActive} setIsActive={setIsActive}/>
      </div>

      <div className="user-header">
        <UserBar isActive={isActive} setIsActive={setIsActive} />
      </div>

      <div className="page-content">
        <h1>Sales</h1>
        <br></br>

        {/* <ResponsiveContainer width={'100%'} height={400}>
          <LineChart
            width={500}
            height={300}
            data={orderData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orderPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer> */}

        <ResponsiveContainer width={'100%'} height={400}>
          <AreaChart
            width={500}
            height={400}
            data={orderChartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="orderPrice"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div></div>

      <div className="site-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Ownerpage;
