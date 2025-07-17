import Header from "./Header/Heading";
import AllSummaryDetail from "./TableDetails/AllSummaryDetail.jsx";
import TableList from "./TableDetails/TableList";
import Actions from "./Actions/Actions";
import { useMainContext } from "../../contexts/MainContext.jsx";
import Loader from "../../common/Loader/Loader.jsx";

function Dashboard() {
  const { loading } = useMainContext();
  return (
    <>
      <div className="w-[90vw] mx-auto pb-10">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <>
            <AllSummaryDetail />
            <TableList />
            <Actions />
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
