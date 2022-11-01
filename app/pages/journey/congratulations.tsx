import { Spacer, Text } from "@nextui-org/react";
import { ConfettiContainer } from "components/ConfettiContainer";
import { MyBitcoinJourneyContent } from "components/tippee/MyBitcoinJourneyContent";
import { MyBitcoinJourneyFooter } from "components/tippee/MyBitcoinJourneyFooter";
import { MyBitcoinJourneyHeader } from "components/tippee/MyBitcoinJourneyHeader";

import { Routes } from "lib/Routes";
import type { NextPage } from "next";
import Head from "next/head";

const CongratulationsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lightsats⚡ - Congratulations</title>
      </Head>
      <MyBitcoinJourneyHeader />
      <ConfettiContainer />
      <MyBitcoinJourneyContent>
        <h2>You did it 🎉</h2>
        <Spacer />
        <Text>You are a proud new owner of a fraction of a bitcoin.</Text>
        <Spacer />
        <Text blockquote>
          Rumors say - those who are gifted some bitcoin are a very special kind
          of people.
        </Text>
        <Spacer />
      </MyBitcoinJourneyContent>

      <Spacer />
      <MyBitcoinJourneyFooter href={Routes.guide} text={"What's Next?"} />
    </>
  );
};

export default CongratulationsPage;
