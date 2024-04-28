function HeaderCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Cell className="border-b-gray-300 border-r-gray-300">{children}</Cell>
  );
}
function Cell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`border-r-2 px-4 py-4  last:border-r-0 ${className}`}>
      {children}
    </p>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="table"
      className="rounded-md m-6 border-2 mx-auto border-gray-200 max-w-6xl min-w-96 overflow-x-scroll"
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="rowheader"
      className="text-center font-semibold border-b-2 bg-gray-200 grid grid-cols-5"
    >
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="row"
      className="text-center bg-gray-50 border-b-2 grid grid-cols-5"
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;
