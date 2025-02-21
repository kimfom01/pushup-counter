import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { use } from "react";

const HistoryTable = ({
  data,
}: {
  data: Promise<
    {
      id: number;
      userId: number;
      count: number;
      when: string;
      date: string;
    }[]
  >;
}) => {
  const historyData = use(data);
  return (
    <Table className="text-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>When</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyData.map((item) => {
          return (
            <TableRow key={item.date}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.when}</TableCell>
              <TableCell className="text-right">{item.count}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
