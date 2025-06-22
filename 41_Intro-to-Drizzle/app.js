import { db } from './config/db.js';
import { usersTable } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const main = async () => {
    //? 1. INSERT data into the users table

    //* Single insert
    const insertResult = await db.insert(usersTable).values({
        name: 'Akkal Dhami',
        age: 18,
        email: 'akkal@example.com',
    });
    console.log('Insert Result:', insertResult);

    //* Multiple inserts
    const insertResults = await db.insert(usersTable).values(
        [
            {
                name: 'Akkal Dhami',
                age: 18,
                email: 'akkal21@example.com',
            },
            {
                name: 'Akkal Dhami',
                age: 18,
                email: 'akkal22@example.com',
            }
            ,
            {
                name: 'John Doe',
                age: 25,
                email: 'y6A9o5@example.com',
            }
        ]
    );
    console.log('Insert Result:', insertResults);

    //? 2. READ data from users table

    const Results = await db.select().from(usersTable);
    console.log(Results)

    const Results2 = await db.select().from(usersTable).where({
        email: 'akkal@example.com',

    })
    console.log(Results2)


    //? 3. UPDATE data from users table

    const updateResult = await db.update(usersTable).set({
        name: 'Akkal Dhami Updated',
        age: 19,
    }).where({
        email: 'akkal@example.com',
    });

    const updateResult2 = await db.update(usersTable).set({
        name: 'Akkal Dhami Updated23',
        age: 19,
    }).where(eq(usersTable.email, 'akkasl@example.com'));
    console.log('Update Result:', updateResult);


    //? 4. DELETE data from users table

    const deleteResult = await db.delete(usersTable).where({
        email: 'akkal@example.com',
    });

    console.log('Delete Result:', deleteResult);
    const deleteResult2 = await db.delete(usersTable).where(eq(usersTable.email, 'akkal21@example.com'));
    console.log('Delete Result:', deleteResult2);
}

main().catch((error) => {
    console.error('Error in main function:', error);
});