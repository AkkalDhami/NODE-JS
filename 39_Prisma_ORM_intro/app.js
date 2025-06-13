import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    //? Create a sigle user
    // const user = await prisma.user.create({
    //     data: {
    //         name: "Aavash",
    //         email: "aavashd@test.com",
    //     }
    // });
    // console.log(user);

    //? Create multiple users
    // const users = await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "Aavash",
    //             email: "aavash14342dhami@test.com",
    //         },
    //         {
    //             name: "Aavash",
    //             email: "Aavash34543@test.com",
    //         }
    //     ]
    // });
    // console.log(users);

    //? Read all users
    // const allUsers = await prisma.user.findMany();
    // console.log(allUsers);

    //? Read single user
    const singleUser = await prisma.user.findUnique({
        where: {
            // id: 1
            email: "aavashdhami@test.com"
        }
    });
    console.log(singleUser);

    //? Update single user
    // const updatedUser = await prisma.user.update({
    //     where: {
    //         id: 1
    //     },
    //     data: {
    //         name: "Aavash Dhami",
    //         email: "akkaldhami@test.com"
    //     }
    // });
    // console.log(updatedUser);


    //? Update multiple user
    // const updatedUsers = await prisma.user.updateMany({
    //     where: {
    //        name: "Aavash"
    //     },
    //     data: {
    //         email: "aav@test.com"
    //     }
    // });
    // console.log(updatedUsers);

    //? Delete single user
    // const deletedUser = await prisma.user.delete({
    //     where: {
    //         id: 1
    //     }
    // });
    // console.log(deletedUser);

    //? Delete multiple user
    // const deletedUsers = await prisma.user.deleteMany({
    //     where: {
    //         name: "Aavash"
    //     }
    // });
    // console.log(deletedUsers);


}


main()
    .catch((err) => console.error(err))
    .finally(async () => await prisma.$disconnect());