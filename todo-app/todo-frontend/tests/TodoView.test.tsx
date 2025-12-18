import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "./App.test";
import { describe, it, expect, beforeEach } from "vitest";
import { todoList, newTodo } from "./testData";
import TodoForm from "../src/Todos/TodoForm";
import TodoList from "../src/Todos/TodoList";
import TodoView from "../src/Todos/TodoView";

describe("Todo Form", () => {
  it("there is form button", async () => {
    renderWithStore(<TodoForm />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Submit" }),
      ).toBeInTheDocument();
    });
  });

  it("there is form input", async () => {
    renderWithStore(<TodoForm />);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });
});

describe("Todo List", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("there is list", async () => {
    fetchMock.mockResponse(JSON.stringify(todoList));

    renderWithStore(<TodoList />);

    await waitFor(() => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      const items = within(list).getAllByRole("listitem");
      expect(items).toHaveLength(3);

      for (let i = 0; i < todoList.length; i++) {
        expect(items[i]).toHaveTextContent(`Todo ${i + 1}`);
        expect(
          within(items[i]).getByRole("button", { name: "Delete" }),
        ).toBeInTheDocument();
        expect(
          within(items[i]).getByRole("button", { name: "Set as done" }),
        ).toBeInTheDocument();
      }
    });
  });
});

describe("Todo View", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("can create new todo, and todo appears in list", async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(todoList))
      .mockResponseOnce(JSON.stringify(newTodo), { status: 201 })
      .mockResponseOnce(JSON.stringify([...todoList, newTodo]));

    renderWithStore(<TodoView />);

    await waitFor(async () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, newTodo.text);
      const button = screen.getByRole("button", { name: "Submit" });
      userEvent.click(button);

      await waitFor(() => {
        const list = screen.getByRole("list");
        const items = within(list).getAllByRole("listitem");
        expect(items).toHaveLength(4);
        expect(items[3]).toHaveTextContent(newTodo.text);
      });
    });
  });
});
