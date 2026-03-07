import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

async function run() {
    try {
        const res = await docClient.send(new GetCommand({
            TableName: "sarthi-users",
            Key: { email: "tuesviki@gmail.com" }
        }));
        console.log("User tuesviki@gmail.com:", res.Item ? "FOUND" : "NOT FOUND");

        const all = await docClient.send(new ScanCommand({
            TableName: "sarthi-users"
        }));
        console.log("All users emails:", all.Items?.map(i => i.email));
    } catch (e) {
        console.error("DB Error:", e);
    }
}
run();
