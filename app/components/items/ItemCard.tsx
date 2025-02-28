import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Button, Collapse, Row, Spacer, Text } from "@nextui-org/react";
import { Icon } from "components/Icon";
import {
  ItemFeatureBadge,
  ItemFeatureBadgeProps,
} from "components/items/ItemFeatureBadge";
import { NextLink } from "components/NextLink";
import { placeholderDataUrl as defaultPlaceholderDataUrl } from "lib/constants";
import { getNativeLanguageName } from "lib/i18n/iso6391";
import { DEFAULT_LOCALE } from "lib/i18n/locales";
import { getItemImageLocation } from "lib/utils";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Item } from "types/Item";
import { LearnItem } from "types/LearnItem";
import { Wallet } from "types/Wallet";

type ItemCardProps = {
  item: Item;
  expanded?: boolean;
};

function getItemFeatures(item: Item, locale: string): ItemFeatureBadgeProps[] {
  const hasLanguage = item.languageCodes.indexOf(locale) > -1;
  const hasDefaultLanguage = item.languageCodes.indexOf(DEFAULT_LOCALE) > -1;
  const itemFeatures: ItemFeatureBadgeProps[] = [
    {
      name: hasLanguage
        ? getNativeLanguageName(locale)
        : hasDefaultLanguage
        ? getNativeLanguageName("en")
        : item.languageCodes.join(", "),
      variant: hasLanguage ? "success" : "warning",
    },
  ];
  if (((item as Wallet).minBalance || 0) > 0) {
    itemFeatures.push({
      name: `${(item as Wallet).minBalance}⚡ min balance`,
      variant: "warning",
    });
  }
  const hasSafePlatform =
    item.platforms.indexOf("mobile") > -1 || item.platforms.indexOf("web") > -1;
  for (const platform of item.platforms) {
    itemFeatures.push({
      name: platform,
      variant: hasSafePlatform ? "success" : "warning",
    });
  }
  if (item.category === "wallets") {
    const nonCustodial =
      (item as Wallet).features?.indexOf("non-custodial") > -1;
    itemFeatures.push({
      name: nonCustodial ? "non-custodial" : "custodial",
      variant: nonCustodial ? "success" : "warning",
    });
  }
  if ((item as Wallet).features?.indexOf("non-custodial") > -1) {
    itemFeatures.push({
      name: `Scan to login`,
      // variant: "success",
    });
  }
  if ((item as LearnItem).difficulty) {
    itemFeatures.push({
      name: (item as LearnItem).difficulty,
      // variant:
      //   (item as LearnItem).difficulty === "easy"
      //     ? "success"
      //     : (item as LearnItem).difficulty === "medium"
      //     ? "warning"
      //     : "error",
    });
  }
  return itemFeatures;
}

export function ItemCard({ item, expanded }: ItemCardProps) {
  const { t } = useTranslation("login");
  const router = useRouter();
  const features: ItemFeatureBadgeProps[] = React.useMemo(
    () => getItemFeatures(item, router.locale || DEFAULT_LOCALE),
    [item, router.locale]
  );

  return (
    <Collapse
      expanded={expanded}
      contentLeft={
        <NextImage
          alt=""
          width={64}
          height={64}
          src={getItemImageLocation(item)}
          style={{
            borderRadius: "8px",
            justifySelf: "flex-start",
            alignSelf: "flex-start",
          }}
          placeholder="blur"
          blurDataURL={item.placeholderDataUrl ?? defaultPlaceholderDataUrl}
        />
      }
      title={item.name}
    >
      <Text color="$gray">{item.slogan}</Text>
      <Spacer y={0.5} />
      <Text color="$gray" size={10} b transform="uppercase">
        Features
      </Text>
      <Row justify="flex-start" align="flex-start" style={{ flexWrap: "wrap" }}>
        {features.map((feature) => (
          <ItemFeatureBadge key={feature.name} {...feature} />
        ))}
      </Row>
      <Spacer y={1} />
      <NextLink href={item.link} passHref>
        <a target="_blank" rel="noreferrer noopener">
          <Row justify="flex-end">
            <Button auto>
              <Icon>
                <ArrowTopRightOnSquareIcon />
              </Icon>
              &nbsp;
              {item.category === "wallets" ? t("install") : t("open")}
            </Button>
          </Row>
        </a>
      </NextLink>
    </Collapse>
  );
}
