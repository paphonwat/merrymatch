import FilterStatus from "./FilterStatus";
import SearchInput from "./Searchinput";

function Topbar({ setComplaint, complaint, searchText, setSearchText }) {
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <p className="text-2xl font-bold ml-16">Complaint list</p>
      <div className="flex gap-4">
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <FilterStatus complaint={complaint} setComplaint={setComplaint} />
      </div>
    </div>
  );
}

export default Topbar;