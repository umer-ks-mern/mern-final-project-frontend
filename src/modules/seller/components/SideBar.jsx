import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate=useNavigate()
  return (
    <CDBSidebar
      textColor="white"
      className="bg-gray-800 text-white"
      fixed
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div className="text-xl font-semibold">Admin Dashboard</div>
      </CDBSidebarHeader>
      <CDBSidebarContent className="text-gray-200">
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large" className="hover:bg-gray-700" onClick={()=>navigate("/admin/viewProducts")}>
            Products
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note" className="hover:bg-gray-700" onClick={()=>navigate("/admin/viewOrders")}>
            Orders
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="credit-card"
            iconType="solid"
            className="hover:bg-gray-700"
            onClick={()=>navigate("/admin/viewUsers")}
          >
            Users
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default SideBar;
