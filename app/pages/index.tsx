import { Button, Container, Link, Row, Spacer, Text } from "@nextui-org/react";
import { User } from "@prisma/client";
import { NewTipButton } from "components/tipper/NewTipButton";
import { Tips } from "components/tipper/Tips";
import { Routes } from "lib/Routes";
import { defaultFetcher } from "lib/swr";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import NextLink from "next/link";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: user } = useSWR<User>(
    session ? `/api/users/${session.user.id}` : null,
    defaultFetcher
  );

  return (
    <>
      <Head>
        <title>Lightsats⚡</title>
      </Head>

      {session ? (
        <>
          <Container
            justify="center"
            alignItems="center"
            display="flex"
            gap={4}
          >
            <Text small>Signed in as {session.user.email}</Text>
            &nbsp;
            <Button size="xs" onClick={() => signOut()}>
              Sign out
            </Button>
          </Container>
          <Spacer />
          {user && <Text>Name: {user.name || "unset"}</Text>}
          {user && (
            <Text>Twitter username: {user.twitterUsername || "unset"}</Text>
          )}
          <Row justify="center">
            <Spacer x={0.5} />
            <NextLink href={Routes.profile}>
              <a>
                <Button size="sm">Update Profile</Button>
              </a>
            </NextLink>
          </Row>

          <Spacer y={2} />
          <NewTipButton />
          <Spacer />
          <Tips />
          <Spacer y={4} />
          <Text>Received a gift?</Text>
          <NextLink href={Routes.withdraw} passHref>
            <Link color="success">withdraw claimed gifts</Link>
          </NextLink>
        </>
      ) : (
        <>
          <Spacer />
          <Text h3>
            Gift Sats without
            <br />
            losing them✌🏼
          </Text>
          <Spacer />
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </>
  );
};

export default Home;
