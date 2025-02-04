import Delete from "./delete";
import EditFaqs from "./edit";

export const columns = [
  {
    name: "Faq Title",
    selector: "faq_title",
    // width: '200px',
    sortable: true,
    cell: (row) => <span className="text-secondary">{row.faq_title}</span>,
  },
  {
    name: "Faq Description",
    selector: "Faq Description",
    // width: '150px',
    sortable: true,
    cell: (row) => (
      <span className="text-secondary">
        <div dangerouslySetInnerHTML={{ __html: row?.faq_description }} />
      </span>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    width: "100px",
    cell: (row) => (
      <div className="d-flex gap-3 justify-content-start align-items-center">
        <div>
          <Delete row={row} />
        </div>
        <div className="ml-1">
          <EditFaqs row={row} />
        </div>
      </div>
    ),
  },
];
