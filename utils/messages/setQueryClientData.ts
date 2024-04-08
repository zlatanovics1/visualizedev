import { MessageType } from "@/types/db-derivated-types";
import { QueryData } from "@/types/react-query-types";
import { type QueryClient } from "@tanstack/react-query";
export function setQueryClientData(
  queryClient: QueryClient,
  newMessage: MessageType,
  channelId: string
) {
  const queryData = queryClient.getQueryData([
    `${channelId || "global"} messages`,
  ]);
  if (queryData) {
    // await queryClient.cancelQueries({
    //   queryKey: [`${params.channelId || "global"} messages`],
    // });

    queryClient.setQueryData(
      [`${channelId || "global"} messages`],
      (data: QueryData) => ({
        ...data,
        pages: data.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              data: [newMessage, ...page.data],
              count: page.count + 1,
            };
          } else
            return {
              ...page,
              count: page.count + 1,
            };
        }),
      })
    );
  } else {
    const queryData: QueryData = {
      pageParams: [0],
      pages: [
        {
          count: 1,
          data: [newMessage],
        },
      ],
    };
    queryClient.setQueryData([`${channelId || "global"} messages`], queryData);
  }
}
