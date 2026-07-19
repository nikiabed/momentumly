import { items } from "@/app/todo/_common/Sidebar/Sidebar.const";
import { Board, BoardList } from "@/app/types";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { boardService } from "../services";
import { BOARD_LABELS } from "../constants";

export function useBoards(
  activeBoard: string,
  setActiveBoard: Dispatch<SetStateAction<string>>,
) {
  const [editedBoard, setEditedBoard] = useState("");
  const [boardList, setBoardList] = useState<BoardList>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      setLoading(true);
      const data = await boardService.getBoards();
      setBoardList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (name: string) => {
    try {
      await boardService.create({
        name,
      });
      await loadBoards();
    } catch (err) {
      console.error("Create board failed", err);
    }
  };

  const saveBoard = async (id: string) => {
    try {
      const newTitle = editedBoard;
      await boardService.updateTitle(id, newTitle);
      await loadBoards();
    } catch (err) {
      console.error("Save board failed:", err);
    }
  };

  const handleBoardInput = (e: any) => {
    setEditedBoard(e.target.value);
  };

  const handleBoardEditable = (id: string) => {
    setBoardList((prev) =>
      prev.map((board) =>
        board._id === id && board.editable
          ? {
              ...board,
              isEdit: true,
            }
          : board,
      ),
    );
  };

  const [newBoardKey, setNewBoardKey] = useState<string | null>(null);

  const handleNewList = async () => {
    const last = Math.max(...boardList.map((b: Board) => b.order ?? 0), 0);
    const key = `board-${Date.now()}`;
    await boardService.create({
      title: BOARD_LABELS.untitled,
      boardKey: key,
      state: false,
      icon: "HamburgerMenu",
      color: "newList",
      editable: true,
      isEdit: true,
      order: last + 1,
      theme: "purple",
      userId: session?.user?.id,
    });

    setNewBoardKey(key);
    setActiveBoard?.(key);
    await loadBoards();
  };

  const removeList = async (id: string) => {
    try {
      const index = boardList.findIndex((b) => b._id === id);
      const nextBoard = boardList[index - 1] || boardList[0];
      await boardService.remove(id);
      await loadBoards();
      if (activeBoard === boardList[index]?.boardKey) {
        setActiveBoard?.(nextBoard?.boardKey || "myDay");
      }
    } catch (err) {
      console.error("Remove board failed:", err);
    }
  };

  return {
    handleBoardInput,
    handleBoardEditable,
    handleNewList,
    boardList,
    setBoardList,
    loading,
    loadBoards,
    createBoard,
    saveBoard,
    removeList,
  };
}
