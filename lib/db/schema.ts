import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),

    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const filesRelations = relations(files, ({ one, many }) => ({
    // Relationship to parent folder
    parent: one(files, {
        fields: [files.parentId], // The foreign key in this table
        references: [files.id], // The primary key in the parent table
    }),

    // Relationship to child files/folders
    children: many(files),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;