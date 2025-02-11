import { use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const LeaderboardTable = ({
  leaderBoardData,
}: {
  leaderBoardData: Promise<
    {
      userId: number;
      name: string | undefined;
      totalPushups: number | null;
    }[]
  >;
}) => {
  const leaderBoard = use(leaderBoardData);
  return (
    <Table className="text-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderBoard.map((item) => {
          return (
            <TableRow key={item.userId}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.totalPushups}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
