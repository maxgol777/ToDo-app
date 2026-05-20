import { atom } from "jotai";
import type { Todo } from "./types";

export const todosAtom = atom<Todo[]>([]);
