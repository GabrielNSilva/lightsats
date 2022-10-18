import { Badge, Card, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { Tip } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import useSWR from "swr";
import { Routes } from "../../lib/Routes";
import { defaultFetcher } from "../../lib/swr";
import { TipStatusBadge } from "./TipStatusBadge";

export function Tips() {
  const { data: session } = useSession();
  const { data: tips } = useSWR<Tip[]>(
    session ? "/api/tipper/tips" : null,
    defaultFetcher
  );

  if (session && !tips) {
    return <>Loading</>;
  }

  if (tips?.length) {
    return (
      <Grid.Container gap={2} justify="center">
        {tips.map((tip) => (
          <Grid xs={12} key={tip.id} justify="center">
            <NextLink href={`${Routes.tips}/${tip.id}`}>
              <a style={{ maxWidth: "400px" }}>
                <Card isPressable isHoverable>
                  <Card.Body>
                    <Row justify="space-between">
                      <Text style={{ flex: 1 }}>
                        {tip.invoice.substring(0, 16)}...
                      </Text>
                      <Badge> {tip.amount}⚡ </Badge>
                      <Spacer x={0.25} />
                      <TipStatusBadge status={tip.status} />
                    </Row>
                    <Text small>
                      Expires in{" "}
                      {formatDistance(new Date(tip.expiry), Date.now())}
                    </Text>
                  </Card.Body>
                </Card>
              </a>
            </NextLink>
          </Grid>
        ))}
      </Grid.Container>
    );
  }

  return <>No tips yet</>;
}
