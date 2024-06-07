'use client'
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { BankAccountType } from "@/types/entities";
import AccountsListItem from "./items/AccountsListItem";
import Button from "@mui/material/Button";
import { usePageContext } from "@/app/lib/contexts";

const AccountsList = ({accounts}: {accounts: BankAccountType[]}) => {
  const { actionShowModal } = usePageContext();

  const handleAdd = () => {
    actionShowModal(true);
  };
  
  return (
    <PaperContainer width="90%">
      <PaperHeader title="Contas">
      <Button variant="contained" size="small" color="primary" onClick={handleAdd}>
          Adicionar
        </Button>
      </PaperHeader>
      {accounts.length > 0 && accounts.map((account: BankAccountType) => (
        account ? <AccountsListItem key={account.id} account={account} /> : null
      ))}
    </PaperContainer>
  );
};

export default AccountsList;
