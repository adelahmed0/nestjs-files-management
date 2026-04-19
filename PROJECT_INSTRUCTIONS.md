# NestJS Files Management - Project Instructions

Behavioral guidelines specifically tailored for the NestJS Files Management project. Based on CLAUDE.md principles with project-specific adaptations.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly about file operations, NestJS patterns, and TypeScript types
- If multiple approaches exist for file handling (streams vs buffers, local vs cloud storage), present them - don't pick silently
- If a simpler NestJS approach exists (built-in pipes vs custom validation), say so
- If file storage requirements, security concerns, or API contracts are unclear, stop. Name what's confusing

## 2. NestJS Simplicity First

**Minimum code that solves the file management problem. Nothing speculative.**

- No file features beyond what was requested (don't add cloud storage if only local was asked)
- No abstractions for single-use file operations
- No "flexibility" for file types or storage locations that weren't requested
- No error handling for impossible filesystem scenarios
- If you write 200 lines for a simple file upload and it could be 50, rewrite it

Ask yourself: "Would a NestJS senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical NestJS Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing NestJS code:
- Don't "improve" unrelated modules, controllers, or services
- Don't refactor decorators or dependency injection that isn't broken
- Match existing NestJS style (module imports, controller patterns, service structure)
- If you notice unrelated dead code in modules, mention it - don't delete it

When your changes create orphans:
- Remove unused imports, unused providers, and unused file handlers that YOUR changes made unused
- Don't remove pre-existing dead code unless asked

The test: Every changed line should trace directly to the file management request.

## 4. Goal-Driven NestJS Execution

**Define success criteria. Loop until verified.**

Transform file management tasks into verifiable goals:
- "Add file upload" -> "Write test for file upload endpoint, then make it pass"
- "Fix file download bug" -> "Write test that reproduces the download issue, then make it pass"
- "Refactor file service" -> "Ensure tests pass before and after refactoring"

For multi-step file management tasks, state a brief plan:
```
1. [Create file upload endpoint] -> verify: [POST /files returns 201 with file metadata]
2. [Add file validation] -> verify: [Invalid file types return 400]
3. [Implement file storage] -> verify: [Files are saved to correct directory]
```

## 5. NestJS-Specific Guidelines

### File Operations
- Always use proper MIME type validation for file uploads
- Implement proper error handling for filesystem operations
- Use NestJS built-in FileInterceptor for multipart/form-data
- Consider file size limits and security implications

### Project Structure
- Follow NestJS module structure: module -> controller -> service
- Keep file operations in dedicated services
- Use DTOs for file metadata validation
- Separate concerns: upload logic, storage logic, validation logic

### TypeScript & Dependencies
- Use proper typing for file operations (Buffer, Stream, File)
- Import only what's needed from @nestjs/common
- Follow existing import patterns in the project
- Use dependency injection properly for services

### Testing
- Test file operations with actual file fixtures when possible
- Mock filesystem operations for unit tests
- Test error scenarios (missing files, invalid types)
- Ensure cleanup in test files

### Security Considerations
- Never trust file names from user input
- Implement proper file type validation (not just extension)
- Consider path traversal attacks
- Validate file sizes appropriately

---

**These guidelines are working if:** fewer unnecessary changes in NestJS diffs, fewer rewrites due to overcomplicated file handling, and clarifying questions about file requirements come before implementation rather than after mistakes.
