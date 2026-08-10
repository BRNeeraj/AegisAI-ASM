type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
};

const demoNotifications: Notification[] = [
  {
    id: 1,
    title: "Critical Vulnerability",
    description: "CVE-2025-1234 detected on api.company.com",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Scan Completed",
    description: "Network scan completed successfully",
    time: "10 min ago",
  },
  {
    id: 3,
    title: "New Asset Found",
    description: "vpn.company.com added",
    time: "25 min ago",
  },
];

export function NotificationPanel() {
  return (
    <div className="glass p-5">
      <h2 className="text-sm font-semibold">
        Live Notifications
      </h2>

      <div className="mt-4 space-y-4">
        {demoNotifications.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border p-4"
          >
            <p className="font-semibold text-cyan">
              {item.title}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}