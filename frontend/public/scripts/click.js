import { getUserIP, createItem, getItems, checkID } from "./api.js";
import { BACKEND_URL } from "./config.js";
export async function updateClickTimes(userIP, num) {
    try {
        // Fetch the item associated with the userIP
        if (checkID(userIP)) {
            console.log(checkID(userIP));
            const data = checkID(userIP);
            const userId = data[0].id;
            const pop = data[0].pop;
            pop[num]++;

            await fetch(`${BACKEND_URL}/items/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pop }),
            });

            return pop[num];
        } else {
            const newPop = [0, 0, 0];
            newPop[num] = 1;

            const newItem = {
                id: userIP,
                name: "New User",
                pop: newPop,
            };

            await createItem(newItem);

            return 1;
        }
    } catch (error) {
        console.error('Error updating click count:', error);
        return null;
    }
}

export function updateClickCount(userIp, num) {
    async function updateData() {
        console.log("Data updated!");
        await updateClickCount(userIp, num)
    }
    setInterval(updateData, 300000);
    updateData().catch(error => console.error('Error updating click count:', error));
}