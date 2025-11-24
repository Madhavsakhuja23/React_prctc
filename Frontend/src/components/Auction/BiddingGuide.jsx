export default function BiddingGuide() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "3rem 1.2rem",
        lineHeight: "1.8",
        fontFamily: "Georgia, serif",
        color: "#3b3b3b"
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: "2.8rem",
          textAlign: "center",
          marginTop: "1.8rem",
          marginBottom: "1.2rem",
          fontWeight: "600",
          color: "#222"
        }}
      >
        Bidding Guide
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto 3rem",
          color: "#555"
        }}
      >
        Learn how auctions work on Aurtistiq and start bidding confidently.
      </p>

      {/* SECTION BLOCK COMPONENT */}
      {[
        {
          title: "1. Understanding Auction Types",
          content:
            "Aurtistiq uses standard timed auctions. Every auction displays a starting bid, countdown timer, and minimum bid increment."
        },
        {
          title: "2. How to Place a Bid",
          list: [
            "Go to an auction artwork page.",
            "Enter an amount higher than the current highest bid.",
            "Click the “Place Bid” button to confirm."
          ]
        },
        {
          title: "3. Bidding Rules",
          list: [
            "Your bid must exceed the current highest bid by the minimum increment.",
            "Once placed, bids cannot be cancelled.",
            "The highest bidder at the timer’s end wins the artwork."
          ]
        },
        {
          title: "4. Auto-Bidding (If Enabled)",
          content:
            "You can set a maximum bid amount and our system will automatically place bids on your behalf until your limit is reached."
        },
        {
          title: "5. When You Win an Auction",
          list: [
            "You receive a confirmation notification.",
            "The artwork moves to your Won Auctions page.",
            "You complete final payment and shipping details."
          ]
        },
        {
          title: "6. If You Get Outbid",
          content:
            "You will receive an instant notification with the new highest bid and an option to increase your offer."
        },
        {
          title: "7. Auction Completion",
          content:
            "When the countdown reaches zero, the auction closes automatically. No further bids are accepted."
        },
        {
          title: "8. Tips for Smart Bidding",
          list: [
            "Place early bids to avoid last-second issues.",
            "Monitor auctions you care about.",
            "Use auto-bidding if you might be offline.",
            "Determine your maximum budget beforehand."
          ]
        }
      ].map((section, i) => (
        <div
          key={i}
          style={{
            background: i % 2 === 0 ? "#faf8f6" : "#f5f3f1",
            padding: "1.8rem",
            borderRadius: "12px",
            marginBottom: "1.6rem",
            boxShadow: "0 0 4px rgba(0,0,0,0.05)"
          }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              marginBottom: "0.8rem",
              color: "#2c2c2c"
            }}
          >
            {section.title}
          </h2>

          {section.content && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "#444"
              }}
            >
              {section.content}
            </p>
          )}

          {section.list && (
            <ul style={{ fontSize: "1.05rem", color: "#444", paddingLeft: "1.4rem" }}>
              {section.list.map((li, idx) => (
                <li key={idx} style={{ marginBottom: "0.4rem" }}>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <p
        style={{
          fontSize: "1.2rem",
          marginTop: "2rem",
          textAlign: "center",
          color: "#555"
        }}
      >
        Need more help? Visit our Help Center or contact support anytime.
      </p>
    </div>
  );
}
