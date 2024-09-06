import React, { memo ,useState } from 'react'
import './Dashboard.css';
import DonationChart from './DonationChart';
import DonutChart from './DonutChart';
import dashboardService from '../../services/dashboardService';
import useDidMountEffect from '../../hooks/UseDidMountEffect';
import usersServices from '../../services/usersServices';
import { useStoreState } from 'easy-peasy';
import BirthdayList from './BirthdayList';
import TopTenDonors from './TopTenDonors';
import UpcomingSevas from './UpcomingSevas';
import JeevanadiList from './JeevanadiList';

const Dashboard = memo(() => {
  const [activeTab, setActiveTab] = useState('Week');
  // const {user} = useStoreState((state) => state.auth);
  const [totalDonationData, setTotalDonation] = useState();
  const [totalDonationByDateList, setTotalDonationByDate] = useState([]);
  const [totalDonationByEventsList, setTotalDonationByEvents] = useState([]);
  const [topTenDonorsList, setTopTenDonors] = useState([]);
  const [upcomingEventsList, setUpcomingEvents] = useState([]);
  const [birthdayAndAnniversaryList, setBirthdayAndAnniversaryList] = useState([]);
  const [selectedType, setSelectedType] = useState(0);
  const [totalEventAmount, setTotalEventAmount] = useState(0);
  const [recurringDonationList, setRecurringDonationList] = useState([]);
  const [jeevanadiNumbers, setJeevanadiNumbers] = useState();
  const [recurringPercentage, setRecurringPercentage] = useState(0);

  useDidMountEffect(() => {
    getDashboardDetails(activeTab);
  }, [selectedType]);

  React.useEffect(() => {
    setTotalEventAmount(
      totalDonationByEventsList.reduce(
        (accumulator, current) => accumulator + current.amount * current.count,
        0
      )
    );
  }, [totalDonationByEventsList]);



  const getDashboardDetails = async (type) => {
    //startLoader();
    
    try {
      const totalDonation = await dashboardService.getTotalDonation(type);
      if (totalDonation) {
        setTotalDonation(totalDonation);
        // if (user.role === 'Donor') {
        //   setRecurringPercentage(totalDonation.donations_percent_change);
        // } else {
        //   setRecurringPercentage(totalDonation.donors_percent_change);
        // }
      }
      const totalDonationByDate = await dashboardService.getDonationByDate(type);
      if (totalDonationByDate.data) {
        setTotalDonationByDate(totalDonationByDate.data);
      }
      const totalDonationByEvents = await dashboardService.getDonationByEvents(type);
      if (totalDonationByEvents.data) {
        setTotalDonationByEvents(totalDonationByEvents.data);
      }
      const topTenDonors = await dashboardService.getTopTenDonors(type);
      if (topTenDonors.data) {
        setTopTenDonors(topTenDonors.data);
      }

      const upcomingEvents = await dashboardService.getUpcomingEvents(type);
      if (upcomingEvents.data) {
        setUpcomingEvents(upcomingEvents.data);
      }

      const birthdayAndAnniversary = await dashboardService.getBirthdayAnniversary(type);
      if (birthdayAndAnniversary.data) {
        setBirthdayAndAnniversaryList(birthdayAndAnniversary.data);
      }

      const recurringDonation = await dashboardService.getRecurringDonationList(type);
      if (recurringDonation.data) {
        setRecurringDonationList(recurringDonation.data);
      }

      const jeevanadiNumbersResponse = await dashboardService.getJeevanadiNumbers(type);
      if (jeevanadiNumbersResponse?.current_jno) {
        setJeevanadiNumbers(jeevanadiNumbersResponse);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //stopLoader();
    }
  };

  React.useEffect(() => {
    getDashboardDetails('week');
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      // startLoader();
      const response = await usersServices.getUsersList();
      // console.log('response of userlist: ');

      // if (Array.isArray(response) && response.length > 0) {
      //   setReferredByList(response);
      // }
    } catch (e) {
      console.log(e);
    }
    // finally {
    //   stopLoader();
    // }
  };
  

  return (
    <div className="dashboard-container">
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30 }} >
      <h1>Welcome to Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'Week' ? 'active' : ''}
          onClick={() => setActiveTab('Week')}
        >
          Week
        </button>
        <button
          className={activeTab === 'Month' ? 'active' : ''}
          onClick={() => setActiveTab('Month')}
          >
          Month
        </button>
        <button
          className={activeTab === 'Year' ? 'active' : ''}
          onClick={() => setActiveTab('Year')}
        >
          Year
        </button>
      </div>
      </div>
      <div className="card-container">
        <div className="card">
          <h4>TOTAL DONATIONS RECEIVED</h4>
          <p>₹9,080.00</p>
        </div>
        <div className="card">
          <h4>TOTAL RECURRING DONORS</h4>
          <p>1</p>
        </div>
        <div className="card">
          <h4>CURRENT RUNNING JEEVANADI NUMBER</h4>
          <p>2013</p>
        </div>
        <div className="card">
          <h4>NEW JEEVANADI MEMBERS</h4>
          <p>1</p>
        </div>
      </div>
      <div className="card-container1">
      <DonationChart />
      <DonutChart />
      <JeevanadiList />
      </div>
      <div className="card-container2">
        <TopTenDonors />
        <UpcomingSevas />
        <BirthdayList />

      </div>
    
    </div>
  );
})

export default Dashboard