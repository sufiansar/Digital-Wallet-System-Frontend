const FAQSection = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {/* FAQ 1 */}
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-border bg-muted/40 p-4 text-foreground cursor-pointer">
            <h3 className="text-lg font-medium">
              What is the Digital Wallet Management System?
            </h3>

            {/* Plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m6-3H6"
              />
            </svg>

            {/* Minus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-muted-foreground">
            Our system is a secure platform that allows users, agents, and
            admins to send, receive, and manage money with real-time transaction
            tracking and role-based access controls.
          </p>
        </details>

        {/* FAQ 2 */}
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-border bg-muted/40 p-4 text-foreground cursor-pointer">
            <h3 className="text-lg font-medium">Is my data and money safe?</h3>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m6-3H6"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-muted-foreground">
            Yes. All transactions are encrypted, and our system includes fraud
            detection, authentication layers, and activity logs to ensure both
            data and funds are secure.
          </p>
        </details>

        {/* FAQ 3 */}
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-border bg-muted/40 p-4 text-foreground cursor-pointer">
            <h3 className="text-lg font-medium">Who can use the system?</h3>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m6-3H6"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-muted-foreground">
            The platform is built for three roles: <strong>Users</strong> (to
            manage their wallets),
            <strong> Agents</strong> (to facilitate services), and{" "}
            <strong>Admins</strong> (to monitor and control the system).
          </p>
        </details>

        {/* FAQ 4 */}
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-border bg-muted/40 p-4 text-foreground cursor-pointer">
            <h3 className="text-lg font-medium">
              Can I see my transaction history?
            </h3>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m6-3H6"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-muted-foreground">
            Absolutely. Users can track all incoming and outgoing transactions
            in real-time, with filters for date, type, and amount.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQSection;
