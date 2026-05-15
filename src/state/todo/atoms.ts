import { atom } from "jotai";
import type { Todo } from "./types";
import { INITIAL_TODOS } from "./initialData";

export const todosAtom = atom<Todo[]>(INITIAL_TODOS);
