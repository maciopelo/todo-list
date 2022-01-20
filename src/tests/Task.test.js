import React from "react";
import Task from "../components/Task"
import { render, fireEvent } from "@testing-library/react"



it("should render Task component correctly", () =>{

    const task = {
        name:"taskName",
        isDone:false
    }

    const {queryByTestId, queryByPlaceholderText} = render(<Task task={task} disabled={true}/>)

    expect(queryByTestId("task-checkbox")).toBeTruthy()
    expect(queryByPlaceholderText("Task name")).toBeTruthy()
})
