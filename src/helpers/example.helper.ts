import { DateTime } from "luxon";

export default class ExampleHelper {
  /**
   ** Get book example.
   *
   * @returns array
   */
  public static book = () => {
    return [
      {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
      },
      {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1,
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1,
      },
    ];
  };

  /**
   ** Get member example.
   *
   * @returns array
   */
  public static member = () => {
    return [
      {
        code: "M001",
        name: "Angga",
      },
      {
        code: "M002",
        name: "Ferry",
      },
      {
        code: "M003",
        name: "Putri",
      },
    ];
  };

  /**
   ** Get loan example.
   *
   * @returns array
   */
  public static loan = () => {
    return [
      {
        member_id: 1,
        book_id: 1,
        loan_date: DateTime.now()
          .minus({
            days: 10,
          })
          .toFormat("yyyy-LL-dd"),
      },

      {
        member_id: 1,
        book_id: 2,
        loan_date: DateTime.now()
          .minus({
            days: 10,
          })
          .toFormat("yyyy-LL-dd"),
      },
    ];
  };
}
