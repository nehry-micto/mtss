import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

function UIPagination({
    links,
}: {
    links: Array<{ active: boolean; label: string; url: string | null }>;
}) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => (
                    <PaginationItem key={index}>
                        {link.label.includes("Previous") ? (
                            <PaginationPrevious
                                isActive={link.active}
                                href={link.url ?? "#"}
                            />
                        ) : link.label.includes("Next") ? (
                            <PaginationNext
                                isActive={link.active}
                                href={link.url ?? "#"}
                            ></PaginationNext>
                        ) : (
                            <PaginationLink
                                isActive={link.active}
                                href={link.url ?? "#"}
                            >
                                {link.label}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}

export default UIPagination;
