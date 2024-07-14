import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { TestModule } from "./test.module";
import { TestService } from "./test.service";

import { AppModule } from "../src/app.module";

describe("BookController", () => {
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

  describe("GET /api/book", () => {
    it("Should be able to get all existing books and quantities. Books that are being borrowed are not counted", async () => {
      await testService.truncateAll();
      await testService.generateExample();

      const response = await request(app.getHttpServer()).get("/api/book").send();

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBeDefined();
      expect(response.body.data).toBeDefined();
    });
  });
});
