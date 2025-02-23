export function Sidebar({ children }) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        {children}
      </div>
    );
  }
  
  export function SidebarItem({ title }) {
    return <div className="p-2 hover:bg-gray-700 cursor-pointer">{title}</div>;
  }
  