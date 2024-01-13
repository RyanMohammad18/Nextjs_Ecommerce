"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { ShoppingCart, BarChart2, Search, Box, Filter } from "react-feather";
import Header from "./Header";
import CartSidebar from "./CartSidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading } from "../redux/slices/cartSlice";

export default function App({ children }) {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="flex-grow">
        <Header />
        <main className="p-4">{children}</main>
      </div>
      <div style={{ position: "relative", height: "100%" }} className="mt-20">
        <div>.</div>
        <Button
          onClick={toggleDrawer(true)}
          className="bg-blue-500 text-white rounded p-5 inline-block mt-20 transition-all duration-300 hover:bg-white hover:text-blue-500 hover:border-blue-500"
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          &lt;&lt;&lt;&lt; <ShoppingCart size={20} />
        </Button>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List className="bg-black text-black p-4">
          <CartSidebar />
        </List>
      </SwipeableDrawer>
    </div>
  );
}
