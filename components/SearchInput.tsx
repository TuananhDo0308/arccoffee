export const SearchBox = ()=> {
    return (
    <div className="flex items-center bg-black text-white border border-white rounded-full w-[300px] px-8 py-4">
        <input
          type="text"
          placeholder="Search item"
          className="bg-transparent text-base text-white outline-none font-medium placeholder-white"
        />
      </div>
    )
}