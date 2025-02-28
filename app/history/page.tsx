import React, { Suspense } from "react";
import ensureSignedIn from "../lib/ensureSignedIn";
import HistoryTable from "./HistoryTable";
import getUserHistory from "../lib/getUserHistory";
import { Metadata } from "next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import months from "../lib/months";

export const metadata: Metadata = {
  title: "History | Pushup Counter",
  description: "Count Your Push-Ups",
};

const History = async (props: {
  searchParams?: Promise<{
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const clerkId = await ensureSignedIn();
  const currentPage = Number(searchParams?.page ?? 1);
  const historyData = await getUserHistory(clerkId, currentPage);
  const totalPages = Math.ceil(historyData.total / historyData.pageSize);

  return (
    <div className="grid grid-rows-[auto_1fr] justify-center h-full w-full gap-16 p-6">
      <h1 className="text-3xl text-center font-bold">
        History ({months.get(dayjs().month() + 1)})
      </h1>
      <Suspense fallback={<div className="italic">Fetching the history</div>}>
        <HistoryTable data={historyData.historyData} />
      </Suspense>
      <Pagination>
        <PaginationContent>
          <form className="flex" method="get">
            <Button type="submit" disabled={currentPage <= 1}>
              <input type="hidden" name="page" value={currentPage - 1} />
              <ChevronLeft className="h-2 w-2" />
              <span>Prev</span>
            </Button>
          </form>
          <PaginationItem>
            <Button variant={"outline"}>{currentPage}</Button>
          </PaginationItem>
          of
          <PaginationItem>
            <Button variant={"ghost"}>{totalPages}</Button>
          </PaginationItem>
          <form className="flex" method="get">
            <input type="hidden" name="page" value={currentPage + 1} />
            <Button type="submit" disabled={currentPage >= totalPages}>
              <span>Next</span>
              <ChevronRight className="h-2 w-2" />
            </Button>
          </form>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default History;
