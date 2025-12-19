import type { UseQueryResult } from '@tanstack/react-query';
import { useLatest } from 'hooks';
import { useEffect, useRef } from 'react';

type QueryEvents<TData = unknown, TError = unknown> = {
  onSuccess?: (data: TData) => unknown;
  onError?: (error: TError) => unknown;
};

export const useQueryEvents = <TData = unknown, TError = unknown>(
  query: UseQueryResult<TData, TError>,
  callbacks: Partial<QueryEvents<TData, TError>>,
) => {
  const { onSuccess, onError } = callbacks;

  const onSuccessRef = useLatest(onSuccess);
  const onErrorRef = useLatest(onError);

  const queryRef = useRef(query);

  queryRef.current = query;

  const wasFetchingRef = useRef(false);

  const wasErrorRef = useRef(false);

  useEffect(() => {
    const isFetching =
      queryRef.current.isFetching || queryRef.current.isLoading;

    const justFinishedFetching =
      wasFetchingRef.current && !isFetching && queryRef.current.isSuccess;

    if (justFinishedFetching && onSuccessRef.current && queryRef.current.data) {
      onSuccessRef.current(queryRef.current.data);
    }

    wasFetchingRef.current = isFetching;
  }, [query.isFetching, query.isLoading]);

  useEffect(() => {
    const justErrored = !wasErrorRef.current && queryRef.current.isError;

    if (justErrored && onErrorRef.current && queryRef.current.error) {
      onErrorRef.current(queryRef.current.error);
    }

    wasErrorRef.current = queryRef.current.isError;
  }, [query.isError]);
};
