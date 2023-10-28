export default function isExpired(timestamp) {
    if (Date.now()/1000 >= timestamp) {
        return true;
    } else {
        return false;
    }
}