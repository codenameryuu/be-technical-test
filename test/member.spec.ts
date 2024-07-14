import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { TestModule } from "./test.module";
import { TestService } from "./test.service";

import { AppModule } from "../src/app.module";

describe("MemberController", () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    testService = app.get(TestService);

    await app.init();
  });

  describe("GET /api/member", () => {
    it("Should be able to shows all existing members. The number of books being borrowed by each member", async () => {
      await testService.truncateAll();
      await testService.generateExample();

      const response = await request(app.getHttpServer()).get("/api/member").send();

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBeDefined();
      expect(response.body.data).toBeDefined();
    });
  });

  describe("POST /api/member/borrow-book", () => {
    it("should be rejected if members borrow more than 2 books", async () => {
      await testService.truncateAll();
      await testService.generateExampleBorrowTwoBooks();

      const response = await request(app.getHttpServer()).post("/api/member/borrow-book").send({
        member_id: 1,
        book_id: 3,
      });

      expect(response.status).toBe(422);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should be rejected if borrowed books are borrowed by other members", async () => {
      await testService.truncateAll();
      await testService.generateExampleOtherMemberBorrowedBook();

      const response = await request(app.getHttpServer()).post("/api/member/borrow-book").send({
        member_id: 1,
        book_id: 1,
      });

      expect(response.status).toBe(422);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should be able to borrow books", async () => {
      await testService.truncateAll();
      await testService.generateExample();

      const response = await request(app.getHttpServer()).post("/api/member/borrow-book").send({
        member_id: 1,
        book_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBeDefined();
      expect(response.body.data).toBeDefined();
    });
  });

  describe("POST /api/member/return-book", () => {
    it("should be rejected if the returned book is not a book that the member has borrowed", async () => {
      await testService.truncateAll();
      await testService.generateExampleBorrowTwoBooks();

      const response = await request(app.getHttpServer()).post("/api/member/return-book").send({
        member_id: 1,
        book_id: 3,
      });

      expect(response.status).toBe(422);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should be able to return books", async () => {
      await testService.truncateAll();
      await testService.generateExampleBorrowTwoBooks();

      const response = await request(app.getHttpServer()).post("/api/member/return-book").send({
        member_id: 1,
        book_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBeDefined();
      expect(response.body.data).toBeDefined();
    });

    it("should be able to return books, but member get penalty and can't borrow book for 3 days", async () => {
      await testService.truncateAll();
      await testService.generateExampleMemberGetPenalty();

      await request(app.getHttpServer()).post("/api/member/return-book").send({
        member_id: 1,
        book_id: 1,
      });

      const response = await request(app.getHttpServer()).post("/api/member/borrow-book").send({
        member_id: 1,
        book_id: 4,
      });

      expect(response.status).toBe(422);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBeDefined();
    });
  });
});
