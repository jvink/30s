export default function RandomId() {
    return Math.random().toString(36).substr(2, 9);
}