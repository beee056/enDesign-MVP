import { pgTable, text, timestamp, integer, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  ownerUserId: text('owner_user_id').notNull(),
  plan: text('plan').notNull().default('free_check'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUserId: text('clerk_user_id').unique().notNull(),
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  name: text('name').notNull(),
  ownerName: text('owner_name'),
  email: text('email').notNull(),
  phone: text('phone'),
  industry: text('industry'),
  region: text('region'),
  address: text('address'),
  hasPhysicalStore: boolean('has_physical_store').default(false),
  websiteUrl: text('website_url'),
  googleMapsUrl: text('google_maps_url'),
  instagramUrl: text('instagram_url'),
  lineUrl: text('line_url'),
  otherSnsUrl: text('other_sns_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const diagnoses = pgTable('diagnoses', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  businessId: uuid('business_id').references(() => businesses.id),
  purpose: text('purpose'),
  pains: text('pains'),
  buildPreference: text('build_preference'),
  scoreTotal: integer('score_total'),
  scoreBasicInfo: integer('score_basic_info'),
  scoreGoogleMaps: integer('score_google_maps'),
  scoreWebsite: integer('score_website'),
  scoreMobile: integer('score_mobile'),
  scoreSns: integer('score_sns'),
  scoreTrust: integer('score_trust'),
  scoreFaq: integer('score_faq'),
  scoreRecruit: integer('score_recruit'),
  scoreVendorRisk: integer('score_vendor_risk'),
  freeSummary: text('free_summary'),
  recommendations: text('recommendations'),
  status: text('status').default('completed'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sites = pgTable('sites', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  businessId: uuid('business_id').references(() => businesses.id),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  themePreset: text('theme_preset').default('warm_local'),
  status: text('status').default('draft'),
  defaultDomain: text('default_domain'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  siteId: uuid('site_id').references(() => sites.id).notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  pageType: text('page_type').default('lp'),
  sortOrder: integer('sort_order').default(0),
  status: text('status').default('draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const blocks = pgTable('blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  pageId: uuid('page_id').references(() => pages.id).notNull(),
  blockType: text('block_type').notNull(),
  sortOrder: integer('sort_order').default(0),
  contentJson: jsonb('content_json'),
  designJson: jsonb('design_json'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const assets = pgTable('assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  businessId: uuid('business_id').references(() => businesses.id),
  siteId: uuid('site_id').references(() => sites.id),
  type: text('type').notNull(),
  fileUrl: text('file_url').notNull(),
  fileName: text('file_name'),
  altText: text('alt_text'),
  usageHint: text('usage_hint'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const domains = pgTable('domains', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  siteId: uuid('site_id').references(() => sites.id).notNull(),
  domain: text('domain').notNull(),
  type: text('type').default('custom'),
  status: text('status').default('pending'),
  verificationStatus: text('verification_status').default('unverified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').unique().notNull(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  billingType: text('billing_type').notNull(),
  pageLimit: integer('page_limit'),
  blockLimit: integer('block_limit'),
  photoLimit: integer('photo_limit'),
  illustrationLimit: integer('illustration_limit'),
  revisionLimit: integer('revision_limit'),
  supportType: text('support_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  businessId: uuid('business_id').references(() => businesses.id),
  planId: uuid('plan_id').references(() => plans.id),
  amount: integer('amount').notNull(),
  status: text('status').default('pending'),
  paymentMethod: text('payment_method'),
  purchasedAt: timestamp('purchased_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const referrals = pgTable('referrals', {
  id: uuid('id').primaryKey().defaultRandom(),
  referrerTenantId: uuid('referrer_tenant_id').references(() => tenants.id),
  referrerUserId: uuid('referrer_user_id').references(() => users.id),
  referredEmail: text('referred_email'),
  referredTenantId: uuid('referred_tenant_id'), // Might not exist initially
  referredOrderId: uuid('referred_order_id'), // Once they purchase
  status: text('status').default('invited'),
  creditedAt: timestamp('credited_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const referralCredits = pgTable('referral_credits', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerTenantId: uuid('owner_tenant_id').references(() => tenants.id).notNull(),
  ownerUserId: uuid('owner_user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  remainingAmount: integer('remaining_amount').notNull(),
  sourceReferralId: uuid('source_referral_id').references(() => referrals.id),
  transferable: boolean('transferable').default(true),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const creditTransfers = pgTable('credit_transfers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fromUserId: uuid('from_user_id').references(() => users.id).notNull(),
  toEmail: text('to_email').notNull(),
  toUserId: uuid('to_user_id').references(() => users.id),
  amount: integer('amount').notNull(),
  message: text('message'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const supportThreads = pgTable('support_threads', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  businessId: uuid('business_id').references(() => businesses.id),
  category: text('category'),
  subject: text('subject'),
  status: text('status').default('open'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const supportMessages = pgTable('support_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  threadId: uuid('thread_id').references(() => supportThreads.id).notNull(),
  senderType: text('sender_type').notNull(), // 'customer', 'admin', 'ai'
  senderUserId: uuid('sender_user_id').references(() => users.id),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const faqEntries = pgTable('faq_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category'),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  sourceThreadId: uuid('source_thread_id').references(() => supportThreads.id),
  status: text('status').default('draft'), // draft, approved
  visibility: text('visibility').default('private'), // private, public
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const aiOutputs = pgTable('ai_outputs', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  relatedType: text('related_type'), // e.g. 'diagnosis', 'page_generation'
  relatedId: uuid('related_id'),
  outputType: text('output_type').notNull(),
  promptVersion: text('prompt_version'),
  inputJson: jsonb('input_json'),
  outputJson: jsonb('output_json'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
