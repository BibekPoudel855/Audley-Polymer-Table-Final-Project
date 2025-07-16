import Header from "./Header/Heading";
import AllSummaryDetail from "./TableDetails/AllSummaryDetail.jsx";
import TableList from "./TableDetails/TableList";
import Actions from "./Actions/Actions";

function Dashboard() {
  return (
    <>
      <div className="w-[90vw] mx-auto pb-10">
        <Header />
        <AllSummaryDetail />
        <TableList />
        <Actions />
      </div>
    </>
  );
}

export default Dashboard;
