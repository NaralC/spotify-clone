import Header from "@/components/header";

import AccountContent from "./components/account-content";

const Account = () => {
  return (
    <div 
      className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900"
    >
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  )
}

export default Account;