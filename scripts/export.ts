import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportToXlsx() {
  console.log("Fetching registrations from Firestore...");

  const snapshot = await getDocs(collection(db, "hacktalk-participants"));

  if (snapshot.empty) {
    console.log("No registrations found.");
    process.exit(0);
  }

  const rows = snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      "#": index + 1,
      Name: data.name ?? "",
      "Student ID": data.student_id ?? "",
      Batch: data.batch ?? "",
      "Phone Number": data.phone_number ?? "",
      Email: data.email ?? "",
      "Registered At": data.created_at?.toDate?.()
        ? data.created_at.toDate().toISOString()
        : (data.created_at ?? ""),
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns
  const colWidths = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(
      key.length,
      ...rows.map((r) => String(r[key as keyof typeof r]).length),
    ),
  }));
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  const filename = `hacktalk-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);

  console.log(`Exported ${rows.length} registrations to ${filename}`);
}

exportToXlsx().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
