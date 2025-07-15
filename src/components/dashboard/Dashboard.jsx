import Header from "./Header/Heading";
import AllTableStats from "./TablesSummary/AllTableStats";
import TableList from "./TablesSummary/TableList";
import Actions from "./Actions/Actions";

function Dashboard() {
  return (
    <>
      <div className="w-[90vw] mx-auto pb-10">
        <Header />
        <AllTableStats />
        <TableList />
        <Actions />
      </div>
    </>
  );
}

export default Dashboard;
