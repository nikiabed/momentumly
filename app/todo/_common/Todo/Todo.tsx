"use client";

import { useContext } from "react";
import Today from "./Today/Today";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export default function Todo() {
  const { focused } = useContext(TodoContext);
    return(

      focused?.map((item: any) => {
        if (item.state) {
          let Component = item.component 
          return <Component item={item} key={item.id} />;
        } else {
          
        }
      })
    )
}
