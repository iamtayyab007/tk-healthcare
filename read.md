// const router = useRouter();
// useEffect(() => {
// const alreadyVerifiedAdmin = localStorage.getItem("adminOtp");
// if (!alreadyVerifiedAdmin) {
// router.push("/?admin=true");
// }
// }, [router]);
const status=['pending','pending','pending','pendin']
const count=status.reduce((acc,stat)=>{
return acc + stat
},0)
