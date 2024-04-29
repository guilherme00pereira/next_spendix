import React from "react";
import { PaperContainer } from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { BankAccountType } from "@/types/entities";
import AccountsListItem from "./items/AccountsListItem";
import {getAccountPaymentMethods} from "@/lib/supabase/methods/payment-methods";

async function getPaymentMethods() {
  const res = await getAccountPaymentMethods();
  return res;
}

const AccountsList = async () => {
  const accounts = await getPaymentMethods();
  return (
    <PaperContainer>
      <PaperHeader title="Contas" />
      {accounts && accounts.map((account: BankAccountType) => (
        <AccountsListItem key={account.id} account={account} />
      ))}
    </PaperContainer>
  );
};

export default AccountsList;
